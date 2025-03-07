# Caddy

This file will tell Caddy to forward the traffic from `minio.local` (or the domain you want to use) to the MinIO container (referenced as `minio` - the name of the service in the `compose.yml` file).


`Caddyfile`:
```
minio.local {
    reverse_proxy minio:9000
    tls /usr/local/share/caddy/minio.crt /usr/local/share/caddy/minio.key
}
```

## Let's Encrypt Certificate

If you're looking for an SSL certificate from Let's Encrypt, you need a public domain that is resolvable on the internet, such as `yourdomain.com`.

`Caddyfile`:
```
yourdomain.com {
    reverse_proxy minio:9000
    tls admin@yourdomain.com
}
```

## Self-signed Certificate

When using domains like `minio.local` or `localhost`, you can not get a certificate from Let's Encrypt. You can generate a self-signed certificate using the following command:

```bash
openssl req -x509 -newkey rsa:4096 -keyout minio.key -out minio.crt -days 365 -nodes
```

This will generate `minio.crt` (the certificate) and `minio.key` (the private key).


`Caddyfile`:
```
yourdomain.com {
    reverse_proxy minio:9000
    tls /path/to/minio.crt /path/to/minio.key
}
```

**⚠️ Warning:** Since this is a self-signed certificate, you may need to manually trust the certificate in your browser or client to avoid SSL warnings.