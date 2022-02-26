import http from 'k6/http';
import { check, sleep } from 'k6';

export const option = {
    vus: 10,
    duration: '3m',
};

export default function () {
 let response =  http.get('https://slides.nicolevanderhoeven.com/2021-load-tests-as-code');
 check(response, {
     "text verification": (r) => r.body.includes("An introduction to k6"),
    });
    sleep(1);
}
