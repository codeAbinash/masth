import { UseQueryResult } from '@tanstack/react-query'
import { ls } from '@utils/storage'
import { useEffect, useMemo } from 'react'

function getLocalData<T>(queryData: T | undefined, key: string): T | null {
  if (queryData) return queryData
  else console.log(`Get local ${key} data`)
  const data = ls.getString(key)
  if (data) return JSON.parse(data)
  return null
}

function setLocalData<T>(profile: T, key: string) {
  if (profile) {
    console.log(`Set local ${key} data`)
    ls.set('profile', JSON.stringify(profile))
  }
}

export default function useLocalData<T>(query: UseQueryResult<T, Error>, key: string): T | null {
  useEffect(() => {
    setLocalData(query.data, key)
  }, [query.data, key])
  return useMemo(() => getLocalData<T>(query.data, key), [key, query.data])
}
