//https://www.youtube.com/watch?v=Xyq6GItCAvY

import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { check, group, sleep } from 'k6';

const failures = new Rate('faild requests');

export const options = {
    tresholds: {
        faild_requests: ['rate<0'],
        http_req_duration: ['p(95)<500'],
    },
    vus: 10,
    duration: '10s',
};


export default function() {
    const response = http.get('https://test-api.k6.io/');
    
    check(response, {
        'status is 200': r => r.status === 200,
    });
    failures.add(response.status !== 200);
};