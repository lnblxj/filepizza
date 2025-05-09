'use client'

import React, { JSX, useCallback, useEffect } from 'react'
import { UploadedFile, UploaderConnectionStatus } from '../types'
import { useWebRTCPeer } from './WebRTCProvider'
import QRCode from 'react-qr-code'
import Loading from './Loading'
import StopButton from './StopButton'
import { useUploaderChannel } from '../hooks/useUploaderChannel'
import { useUploaderConnections } from '../hooks/useUploaderConnections'
import { CopyableInput } from './CopyableInput'
import { ConnectionListItem } from './ConnectionListItem'
import { ErrorMessage } from './ErrorMessage'
import { setRotating } from '../hooks/useRotatingSpinner'

const QR_CODE_SIZE = 128

export default function Uploader({
  files,
  password,
  onStop,
}: {
  files: UploadedFile[]
  password: string
  onStop: () => void
}): JSX.Element {
  const { peer, stop } = useWebRTCPeer()
  const { isLoading, error, longSlug, shortSlug, longURL, shortURL } =
    useUploaderChannel(peer.id)
  const connections = useUploaderConnections(peer, files, password)

  const handleStop = useCallback(() => {
    stop()
    onStop()
  }, [stop, onStop])

  const activeDownloaders = connections.filter(
    (conn) => conn.status === UploaderConnectionStatus.Uploading,
  ).length

  useEffect(() => {
    setRotating(activeDownloaders > 0)
  }, [activeDownloaders])

  if (isLoading || !longSlug || !shortSlug) {
    return <Loading text="正在创建频道..." />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <>
      <div className="flex w-full items-center">
        <div className="flex-none mr-4">
          <QRCode value={shortURL ?? ''} size={QR_CODE_SIZE} />
        </div>
        <div className="flex-auto flex flex-col justify-center space-y-2">
          <CopyableInput label="完整链接" value={longURL ?? ''} />
          <CopyableInput label="短链接" value={shortURL ?? ''} />
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-700 w-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-stone-400 dark:text-stone-200">
            {activeDownloaders} 正在下载, 共 {connections.length} 个
          </h2>
          <StopButton onClick={handleStop} />
        </div>
        {connections.map((conn, i) => (
          <ConnectionListItem key={i} conn={conn} />
        ))}
      </div>
    </>
  )
}
