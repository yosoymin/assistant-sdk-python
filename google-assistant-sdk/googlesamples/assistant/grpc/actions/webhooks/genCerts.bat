openssl genrsa -out client-key.pem 2048
openssl req -config "C:\Program Files (x86)\GnuWin32\share\openssl.cnf" -new -key client-key.pem -out client.csr
openssl x509 -req -in client.csr -signkey client-key.pem -out client-cert.pem