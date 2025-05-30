import NetInfo from '@react-native-community/netinfo'
import { useFocusEffect } from '@react-navigation/native'
import { NotifyOnChangeProps, onlineManager } from '@tanstack/react-query'
import React from 'react'

// Online status management
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})

// function onAppStateChange(status: AppStateStatus) {
//   if (Platform.OS !== 'web') {
//     focusManager.setFocused(status === 'active')
//   }
//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', onAppStateChange)

//     return () => subscription.remove()
//   }, [])

//   return null
// }

// Refresh on Screen focus

export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      refetch()
    }, [refetch]),
  )
}

// Disable re-renders on out of focus Screens
export function useFocusNotifyOnChangeProps(notifyOnChangeProps?: NotifyOnChangeProps) {
  const focusedRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true

      return () => {
        focusedRef.current = false
      }
    }, []),
  )

  return () => {
    if (!focusedRef.current) {
      return []
    }

    if (typeof notifyOnChangeProps === 'function') {
      return notifyOnChangeProps()
    }

    return []
    // return notifyOnChangeProps.current
  }
}
