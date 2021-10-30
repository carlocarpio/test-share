import React, { FC } from "react"

interface iShareButton {
  label: string
  onClick: () => void
}

const ShareButton: FC<iShareButton> = ({ label, onClick }) => {
  return (
    <button className={`custom-button`} onClick={onClick}>
      {label}
    </button>
  )
}

export default ShareButton