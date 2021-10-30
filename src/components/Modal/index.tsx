import React, { FC, Fragment, useState, useEffect } from "react"

interface iModal {
  visibility: boolean
  onClose: () => void
}

const Modal: FC<iModal> = ({ visibility, onClose }) => {

  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [hasResults, setResults] = useState<boolean>(false)
  const [shareableLink] = useState<string>(`https://thisisasamplelink.com`)
  const [copyCount, setCopyCount] = useState<number>(0)
  const [isCopyShow, setCopyShow] = useState<boolean>(false)

  const unmount = () => {
    /**
     * Reset the states when closed
     */
    setSubmitting(false)
    setResults(false)
    setCopyCount(0)
    setCopyShow(false)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
      setResults(true)
    }, 2000)
  }

  const handleClose = (): void => {
    onClose()
    unmount()
  }

  const handleCopy = (): void => {
    setCopyCount(copyCount + 1)
    navigator.clipboard.writeText(shareableLink)
  }

  const RenderForm = (): JSX.Element | null => {
    if (isSubmitting) {
      return <h4>{`Loading...`}</h4>
    }

    if (hasResults) {
      return null
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className={`form-item`}>
          <label className={`form-label`}><input name="weeks" type={`radio`} value={`1`} /> {`1 week`}</label>
        </div>
        <div className={`form-item`}>
          <label className={`form-label`}><input name="weeks" type={`radio`} value={`2`} /> {`2 weeks`}</label>
        </div>
        <div className={`form-submit`}>
          <button className={`custom-button`} type="submit">{`OK`}</button>
        </div>
      </form>
    )
  }

  const RenderBackdrop = (): JSX.Element | null => {
    if (!visibility) {
      return null
    }

    return (
      <div className={`modal-backdrop`} onClick={handleClose} />
    )
  }

  const RenderLink = (): JSX.Element | null => {
    if (!hasResults) {
      return null
    }

    return (
      <div className={`share-link`}>
        <div>{shareableLink}</div>
        <button className="custom-button" onClick={() => handleCopy()}>{`Copy`}</button>
      </div>
    )
  }

  useEffect(() => {
    setCopyShow(true)

    setTimeout(() =>{
      setCopyShow(false)
    }, 1000)
  }, [copyCount])

  return (
    <Fragment>
      <div className={`modal ${visibility ? `active` : `` }`}>
        <RenderLink />
        <RenderForm />
        {isCopyShow ? <span>{`Copied`}</span> : <span>{``}</span>}
      </div>
      <RenderBackdrop />
    </Fragment>
  )
}

export default Modal