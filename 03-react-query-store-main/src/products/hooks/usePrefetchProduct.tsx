import { useQueryClient } from "@tanstack/react-query";


export const usePrefetchProduct = () => {

  const queryClient = useQueryClient(); 
    
  const prefetchProduct = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ['product', id],
      queryFn:() => fetch(`/api/products/${id}`).then(res => res.json())
    })
  };
  return prefetchProduct ;
}
