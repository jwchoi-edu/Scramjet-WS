//@ts-expect-error no typedefs
import { server as wisp } from '@mercuryworkshop/wisp-js/server'
import http from 'node:http'

const wispserver = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("wisp server js rewrite");
});
wisp.options.allow_private_ips = true;
wisp.options.allow_loopback_ips = true;
wisp.options.dns_servers = ["94.140.14.14", "94.140.15.15"];

wispserver.on("upgrade", (req, socket, head) => {
	wisp.routeRequest(req, socket, head);
});

wispserver.listen(4141);
