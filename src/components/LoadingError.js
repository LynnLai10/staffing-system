import React from 'react'
import { Loader, Alert } from "rsuite";

const LoadingError = (props) => {
  const { loading, error } = props
  return (
    <div>
    {loading && (
      <Loader
        backdrop
        center
        size="md"
        content={`Pending... Please wait for a moment.`}
        vertical
      />
    )}
    {error && Alert.error('Failed. Please try again.')}
    </div>
  )
}

export default LoadingError