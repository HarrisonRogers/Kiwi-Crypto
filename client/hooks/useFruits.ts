import { useQuery } from '@tanstack/react-query'
import { getCryptos } from '../apis/cryptosApi'

// import { getFruits } from '../apis/cryptosApi'

export function useCryptos() {
  const query = useQuery({
    queryKey: ['cryptos'],
    queryFn: () => getCryptos(),
  })
  return {
    query,
  }
}

// export function useFruits() {
//   const query = useQuery({ queryKey: ['fruits'], queryFn: getFruits })
//   return {
//     ...query,
//     // Extra queries go here e.g. addFruit: useAddFruit()
//   }
// }

// export function useFruitsMutation<TData = unknown, TVariables = unknown>(
//   mutationFn: MutationFunction<TData, TVariables>,
// ) {
//   const queryClient = useQueryClient()
//   const mutation = useMutation({
//     mutationFn,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['fruits'] })
//     },
//   })

//   return mutation
// }

// Query functions go here e.g. useAddFruit
//  function useAddFruit() {
//   return useFruitsMutation(addFruit)
// }
