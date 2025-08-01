import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  authorUsername: string;
  authorImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  authorUsername,
  authorImageUrl,
  reviewRating,
  reviewCount,
  price,
}: ProductCardProps) => {
  return (
    <Link href={`:${id}`}>
      <div className="h-full bg-white border rounded-md flex flex-col overflow-hidden hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all">
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            src={imageUrl || "/sign-up.jpg"}
            className="object-cover"
          />
        </div>

        <div className="p-4 border-y flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>

          {/* TODO: Redirect to Use shop */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {}}
          >
            {authorImageUrl && (
              <Image
                src={authorImageUrl}
                alt={authorUsername}
                height={16}
                width={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm underline font-medium">{authorUsername}</p>
          </div>

          {!!reviewCount && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-black" />
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}

          <div className="p-4">
            <div className="relative px-2 py-1 border bg-pink-400 w-fit">
              <div className="text-sm font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(Number(price))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse"></div>
  );
};
