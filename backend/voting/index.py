import json
import os
import psycopg2
from typing import Dict, Any

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Обработка голосования с проверкой IP и получение результатов
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters', {})
            nomination_id = params.get('nomination_id')
            voter_ip = event.get('requestContext', {}).get('identity', {}).get('sourceIp', 'unknown')
            
            if nomination_id:
                cur.execute('''
                    SELECT c.id, c.name, COUNT(v.id) as votes
                    FROM candidates c
                    LEFT JOIN votes v ON c.id = v.candidate_id
                    WHERE c.nomination_id = %s
                    GROUP BY c.id, c.name
                    ORDER BY c.id
                ''', (nomination_id,))
                
                candidates = [
                    {'id': row[0], 'name': row[1], 'votes': row[2]}
                    for row in cur.fetchall()
                ]
                
                cur.execute('''
                    SELECT candidate_id 
                    FROM votes 
                    WHERE nomination_id = %s AND voter_ip = %s
                ''', (nomination_id, voter_ip))
                
                voted_row = cur.fetchone()
                voted_candidate_id = voted_row[0] if voted_row else None
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'candidates': candidates,
                        'voted_candidate_id': voted_candidate_id
                    }),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'nomination_id required'}),
                'isBase64Encoded': False
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            candidate_id = body_data.get('candidate_id')
            nomination_id = body_data.get('nomination_id')
            voter_ip = event.get('requestContext', {}).get('identity', {}).get('sourceIp', 'unknown')
            
            if not candidate_id or not nomination_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'candidate_id and nomination_id required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute('''
                SELECT id FROM votes 
                WHERE nomination_id = %s AND voter_ip = %s
            ''', (nomination_id, voter_ip))
            
            if cur.fetchone():
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Already voted in this nomination'}),
                    'isBase64Encoded': False
                }
            
            cur.execute('''
                INSERT INTO votes (candidate_id, nomination_id, voter_ip)
                VALUES (%s, %s, %s)
            ''', (candidate_id, nomination_id, voter_ip))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
        
    finally:
        cur.close()
        conn.close()
