import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

Pusher.logToConsole = true;

const echo = new Echo({
 broadcaster: 'pusher',
 key: '22d37cd76f03144c6fda',
 cluster: 'eu',
 encrypted: true,
 authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
 auth: {
  headers: {
   Authorization: `Bearer 7|JsXzlf566BC7Cn8MAzwI4gPJEr3I7NqhpXv6ZMBF6f2618b4`,
  },
 },
});

export default echo;
