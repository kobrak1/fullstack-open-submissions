import { Skeleton } from '@mui/material'

const SkeletonLoader = () => (
  <>
    <Skeleton variant="rounded" width={510} height={60} style={{ margin:'1rem' }} />
    <Skeleton variant="rounded" width={510} height={60} style={{ margin:'1rem' }} />
    <Skeleton variant="rounded" width={510} height={60} style={{ margin:'1rem' }} />
  </>
)

export default SkeletonLoader