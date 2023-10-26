import { Dispatch, FC, SetStateAction } from 'react'
import { BaseConfigs, OneDriveConfigs } from 'types'
import useOneDriveAuth from '../hooks/useOneDriveAuth'

interface Props {
    baseConfigs: BaseConfigs
    oneDriveConfigs: OneDriveConfigs
    setFiles: Dispatch<SetStateAction<File[]>>
    setView: Dispatch<SetStateAction<string>>
}

/**
 * Upload files from One Drive to S3 bucket
 * @param oneDriveConfigs one drive configs
 * @param setFilesFromParent return the files to the parent component
 * @constructor
 */
const OneDriveUploader: FC<Props> = ({ oneDriveConfigs }: Props) => {
    const { token, user, fileList } = useOneDriveAuth(
        oneDriveConfigs.onedrive_client_id,
    )

    console.log(fileList)

    // /**
    //  *  @description Get the user's name and files list when the token is set
    //  */
    // useEffect(() => {
    //     if (token) {
    //         ;(async () => {
    //             // await getUserName()
    //             // await getFilesList()
    //         })()
    //     }
    // }, [token])
    return (
        <></>
        // <FileBrowser
        //     googleFiles={googleFiles}
        //     handleSignOut={handleSignOut}
        //     user={user}
        //     downloadFile={downloadFile}
        //     setFiles={setFiles}
        //     setView={setView}
        //     accept={accept || '*'}
        // />
    )
}

export default OneDriveUploader
