# Aplicación usando Elysia, un framework de backend para Bun.js y React.js


## MQTT Server

    sudo systemctl status mosquitto.service
    sudo systemctl stop mosquitto.service
    sudo systemctl start mosquitto.service
    sudo systemctl restart mosquitto.service
    sudo systemctl enable mosquitto.service
    sudo systemctl disable mosquitto.service

    https://www.luisllamas.es/como-instalar-mosquitto-el-broker-mqtt/
    
## ESP32
    https://www.luisllamas.es/curso-esp8266-esp32/

## Cloudflare

https://pkg.cloudflare.com/index.html

#### Instalar - Ubuntu 20.04 (Focal Fossa)

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
    
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared focal main' | sudo tee /etc/apt/sources.list.d/cloudflared.list

sudo apt-get update && sudo apt-get install cloudflared
```
#### Correr el servicio

    cloudflared tunnel --url http://localhost:3000
    cloudflared tunnel --url http://localhost:5173