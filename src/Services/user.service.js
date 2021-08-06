import axios from 'axios'

import { getToken } from '../Utils'

export async function getUserData() {
  try {
    const response = await axios.get(
      'https://HealthStore.bravesoldier.repl.co/user',
      {
        headers: {
          Authorization: getToken(),
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response) {
        return {
          ...error.response.data,
          status: error.response.status,
        }
      }
    }
  }
}

export async function wishlistAdd(productId) {
  try {
    const response = await axios.post(
      'https://HealthStore.bravesoldier.repl.co/user/wishlistadd',
      {
        productId,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response) {
        return {
          ...error.response.data,
          status: error.response.status,
        }
      }
    }
  }
}

export async function wishlistRemove(productId) {
  try {
    const response = await axios.post(
      'https://HealthStore.bravesoldier.repl.co/user/wishlistremove',
      {
        productId,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response) {
        return {
          ...error.response.data,
          status: error.response.status,
        }
      }
    }
  }
}

export async function cartAdd(productId) {
  try {
    const response = await axios.post(
      'https://HealthStore.bravesoldier.repl.co/user/cartadd',
      {
        productId,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response) {
        return {
          ...error.response.data,
          status: error.response.status,
        }
      }
    }
  }
}

export async function cartRemove(productId) {
  try {
    const response = await axios.post(
      'https://HealthStore.bravesoldier.repl.co/user/cartremove',
      {
        productId,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response) {
        return {
          ...error.response.data,
          status: error.response.status,
        }
      }
    }
  }
}

export async function incrementQuantity(productId) {
  try {
    const response = await axios.post(
      'https://HealthStore.bravesoldier.repl.co/user/incrementQuantity',
      {
        productId,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response) {
        return {
          ...error.response.data,
          status: error.response.status,
        }
      }
    }
  }
}

export async function decrementQuantity(productId) {
  try {
    const response = await axios.post(
      'https://HealthStore.bravesoldier.repl.co/user/decrementQuantity',
      {
        productId,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response) {
        return {
          ...error.response.data,
          status: error.response.status,
        }
      }
    }
  }
}
