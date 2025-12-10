import json
import os
import psycopg2
from typing import Dict, Any

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение всех результатов голосования для администратора
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute('''
            SELECT 
                c.nomination_id,
                c.name as candidate_name,
                COUNT(v.id) as votes,
                c.id as candidate_id
            FROM candidates c
            LEFT JOIN votes v ON c.id = v.candidate_id
            GROUP BY c.nomination_id, c.name, c.id
            ORDER BY c.nomination_id, votes DESC
        ''')
        
        results = {}
        for row in cur.fetchall():
            nomination_id = row[0]
            candidate_name = row[1]
            votes = row[2]
            candidate_id = row[3]
            
            if nomination_id not in results:
                results[nomination_id] = []
            
            results[nomination_id].append({
                'candidate_id': candidate_id,
                'candidate_name': candidate_name,
                'votes': votes
            })
        
        cur.execute('SELECT COUNT(DISTINCT voter_ip) FROM votes')
        total_voters = cur.fetchone()[0]
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'results': results,
                'total_voters': total_voters
            }),
            'isBase64Encoded': False
        }
        
    finally:
        cur.close()
        conn.close()
