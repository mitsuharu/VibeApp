// https://github.com/openai/openai-node

import Constants from 'expo-constants'
import OpenAI from 'openai'
import { useCallback, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

type AssistantType = {
  status: Status
  response: string | undefined
  fetchResponse: (input: string) => void
}

export const useAssistant = (): AssistantType => {
  const apiKey = Constants.expoConfig?.extra?.OPENAI_API_KEY

  const [status, setStatus] = useState<Status>('idle')
  const [response, setResponse] = useState<string | undefined>(undefined)

  const fetchResponse = useCallback(
    async (input: string) => {
      const client = new OpenAI({ apiKey: apiKey })
      try {
        setStatus('loading')

        // https://platform.openai.com/docs/guides/text?api-mode=responses
        const result = await client.responses.create({
          model: 'gpt-4.1',
          input: input,
          tools: [
            {
              type: 'mcp',
              server_label: 'yumemi-openhandbook',
              server_url: 'https://openhandbook.mcp.yumemi.jp/sse',
              require_approval: 'never',
            },
          ],
        })

        setStatus('success')
        setResponse(result.output_text)
      } catch (error) {
        // https://github.com/openai/openai-node?tab=readme-ov-file#handling-errors
        console.warn(error)
        setStatus('error')
        setResponse(undefined)
        throw error
      }
    },
    [apiKey],
  )

  return { status, response, fetchResponse }
}
