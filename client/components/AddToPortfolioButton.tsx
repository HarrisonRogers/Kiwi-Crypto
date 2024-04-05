import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addCryptoToPortfolio, getCryptos } from '../apis/cryptosApi'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { Portfolio, AuthOID } from '../../models/dbModels'

export default function AddToPortfolioButton({ coin }) {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently, user } = useAuth0()
  // const [authO_id, setAuthOId] = useState('')

  // useEffect(() => {
  //   if (user && user.sub) {
  //     setAuthOId(user.sub)
  //   }
  // }, [user])

  const mutation = useMutation({
    mutationFn: addCryptoToPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio coins'] })
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const authO_id = user?.sub
      const token = await getAccessTokenSilently()
      const cryptoToAdd = { ...coin, authO_id }
      mutation.mutate({ crypto: cryptoToAdd, token })
      console.log(token, authO_id)
    } catch (error) {
      console.error('Error getting token: ', error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button className="btn">Add to Portfolio</button>
      </form>
    </>
  )
}
