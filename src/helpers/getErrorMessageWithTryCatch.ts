export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return 'Coś poszło nie tak :/'
  }