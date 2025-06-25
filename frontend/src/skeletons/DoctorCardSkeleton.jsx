import Skeleton from "react-loading-skeleton";

const DoctorCardSkeleton = () => {
    return (
        <div className="h-96 w-72 border-b border-r border-l border-gray-100">
            <Skeleton height="70%" width="100%"/>
            <div className="p-4 border-t border-t-gray-100">
                <Skeleton width="30%" height={12} />
                <Skeleton width="60%" height={12} />
                <Skeleton width="40%" height={12} />
            </div>
        </div>
    )
}

export default DoctorCardSkeleton;