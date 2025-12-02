import { Card, CardContent, CardFooter } from '@/components/ui/card';

const SkeletonLoader = () => {
  return (
    <Card className="h-full overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted" />
      <CardContent className="p-4">
        <div className="h-4 bg-muted rounded mb-2" />
        <div className="h-3 bg-muted rounded mb-3 w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-10 bg-muted rounded w-full" />
      </CardFooter>
    </Card>
  );
};

export default SkeletonLoader;