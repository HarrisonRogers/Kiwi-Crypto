/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCryptoToPortfolio } from '../apis/cryptosApi'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
// import { Portfolio } from '../../models/dbModels'

export default function AddToPortfolioButton({ coin }) {
  const [clicked, setClicked] = useState(false)
  const queryClient = useQueryClient()
  const { getAccessTokenSilently, user } = useAuth0()

  // Post a crypto to portfolio
  const mutation = useMutation({
    mutationFn: addCryptoToPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio coins'] })
    },
  })

  // Handle submit button which gets access token to put in users own portfolio
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const authO_id = user?.sub
      const token = await getAccessTokenSilently()
      const cryptoToAdd = { ...coin, authO_id }
      mutation.mutate({ crypto: cryptoToAdd, token })
    } catch (error) {
      console.error('Error getting token: ', error)
    }
  }

  const handleClick = () => {
    setClicked((prev) => !prev)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <i
          onClick={handleClick}
          className={
            clicked
              ? 'fa-solid fa-star star bg-orange'
              : 'fa-solid fa-star star'
          }
        ></i>
      </form>
    </>
  )
}
