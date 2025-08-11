import { ofetch } from 'ofetch'

function printUsage(): void {
  console.log('Usage: ts-node scripts/kv-save-data.ts <endpoint> <valueToStore>')
}

async function postValue(endpoint: string, value: string): Promise<void> {
  const data = await ofetch(endpoint, {
    method: 'POST',

    body: {
      valueToStore: value
    }
  })

  console.log('Stored value response:', data)
}

async function main() : Promise<void> {
  const endpoint = process.argv[2]
  const value = process.argv[3]

  if (endpoint === undefined || value === undefined) {
    printUsage()

    process.exit(1)
  }

  try {
    await postValue(endpoint, value)
  } catch (error) {
    console.error(error)

    process.exit(1)
  }
}

void main()
