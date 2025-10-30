# Como adicionar o vídeo de fundo

Para remover as marcas d'água do YouTube, você precisa baixar o vídeo e colocá-lo nesta pasta.

## Passos:

1. Acesse: https://youtu.be/nZoaZDOe6bg
2. Use um serviço como:
   - https://yt1s.com/
   - https://y2mate.com/
   - https://ssyoutube.com/
3. Baixe o vídeo em formato MP4 (qualidade 720p ou 1080p recomendada)
4. Renomeie o arquivo para: `hero-background.mp4`
5. Coloque o arquivo nesta pasta: `attached_assets/videos/hero-background.mp4`
6. O vídeo será carregado automaticamente sem marcas d'água

## Alternativa: Usar yt-dlp (se disponível)

```bash
yt-dlp -f "bestvideo[height<=1080]+bestaudio/best[height<=1080]" -o attached_assets/videos/hero-background.mp4 "https://youtu.be/nZoaZDOe6bg"
```
