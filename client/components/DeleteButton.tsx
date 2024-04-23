import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCoinFromPortfolio } from '../apis/cryptosApi.ts'
import { Id } from '../../models/dbModels.ts'

export default function DeleteButton({ id }: Id) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => deleteCoinFromPortfolio({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio coin'] })
      queryClient.setQueryData(['checkPortfolio', id], false)
    },
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <button className="btn" onClick={handleClick}>
      x
    </button>
  )
}
