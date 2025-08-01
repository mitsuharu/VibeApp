import type React from 'react'
import { useEffect, useState } from 'react'
import { View, type ViewStyle } from 'react-native'
import { WebView } from 'react-native-webview'
import type { BladeShape } from '@/utils/bladeShapes'

interface Props {
  imageUri: string
  bladeShape: BladeShape
  width: number
  height: number
  style?: ViewStyle
  onProcessed?: (processedUri: string) => void
}

export const BladeShapedImage: React.FC<Props> = ({
  imageUri,
  bladeShape,
  width,
  height,
  style,
  onProcessed,
}) => {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    const points = bladeShape.maskPoints
      .map((point) => `${point.x * width}, ${point.y * height}`)
      .join(' ')

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 0; background: transparent; }
          canvas { display: block; }
        </style>
      </head>
      <body>
        <canvas id="canvas" width="${width}" height="${height}"></canvas>
        <script>
          const canvas = document.getElementById('canvas');
          const ctx = canvas.getContext('2d');
          
          const img = new Image();
          img.crossOrigin = 'anonymous';
          
          img.onload = function() {
            // クリッピングパスを作成
            ctx.beginPath();
            const points = [${bladeShape.maskPoints.map((p) => `[${p.x * width}, ${p.y * height}]`).join(', ')}];
            
            ctx.moveTo(points[0][0], points[0][1]);
            for (let i = 1; i < points.length; i++) {
              ctx.lineTo(points[i][0], points[i][1]);
            }
            ctx.closePath();
            ctx.clip();
            
            // 画像を描画
            ctx.drawImage(img, 0, 0, ${width}, ${height});
            
            // 結果をBase64で取得
            try {
              const dataUrl = canvas.toDataURL('image/png');
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'imageProcessed',
                data: dataUrl
              }));
            } catch (e) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'error',
                data: e.message
              }));
            }
          };
          
          img.onerror = function() {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'error',
              data: 'Failed to load image'
            }));
          };
          
          img.src = '${imageUri}';
        </script>
      </body>
      </html>
    `

    setHtmlContent(html)
  }, [imageUri, bladeShape, width, height])

  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data)
      if (message.type === 'imageProcessed' && onProcessed) {
        onProcessed(message.data)
      } else if (message.type === 'error') {
        console.error('Canvas processing error:', message.data)
      }
    } catch (error) {
      console.error('Failed to parse WebView message:', error)
    }
  }

  return (
    <View style={[{ width, height }, style]}>
      <WebView
        source={{ html: htmlContent }}
        style={{ width, height, backgroundColor: 'transparent' }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        mixedContentMode='compatibility'
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  )
}
