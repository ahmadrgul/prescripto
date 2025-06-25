import Skeleton from 'react-loading-skeleton'

const SpecializationSkeleton = () => {
  return (
    <div className='w-60 p-3 text-center border border-gray-100 rounded-lg'>
        <Skeleton height={12} width="80%" />
    </div>
  )
}

export default SpecializationSkeleton