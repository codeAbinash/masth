import { check_maintenance_f } from '@query/api'
import { useQuery } from '@tanstack/react-query'
import type { NavProp } from '@utils/types'
import { useEffect } from 'react'

export default function MaintenanceNavigation({ navigation }: NavProp) {
  const checkMaintenance = useQuery({ queryKey: ['checkMaintenance'], queryFn: check_maintenance_f })

  useEffect(() => {
    if (checkMaintenance.data?.status) {
      navigation.replace('UnderMaintenance')
    }
  }, [checkMaintenance.data, navigation])

  return null
}
