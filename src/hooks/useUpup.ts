import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CloudStorageConfigs } from '../types/CloudStorageConfigs'
import { GoogleConfigs } from '../types/GoogleConfigs'
import { BaseConfigs } from '../types/BaseConfigs'
import { OneDriveConfigs } from '../types/OneDriveConfigs'
import { S3Configs } from '../types/S3Configs'

const space_secret = process.env.SPACE_SECRET
const space_key = process.env.SPACE_KEY
const space_endpoint = process.env.SPACE_ENDPOINT
const space_region = process.env.SPACE_REGION
const document_space = process.env.SPACE_DOCUMENTS
const image_space = process.env.SPACE_IMAGES
const onedrive_client_id = process.env.ONEDRIVE_CLIENT_ID
const google_client_id = process.env.GOOGLE_CLIENT_PICKER_ID
const google_app_id = process.env.GOOGLE_APP_ID
const google_api_key = process.env.GOOGLE_API_KEY

/**
 * determines whether the user is uploading a document or an images
 * @param isDocument
 */
interface Props {
    isDocument?: boolean | null
    multiple?: boolean
    setFiles?: Dispatch<SetStateAction<File[]>>
}

/**
 * @param props
 */
const useUpup: (props?: Props) => {
    cloudStorageConfigs: CloudStorageConfigs
    googleConfigs: GoogleConfigs
    baseConfigs: BaseConfigs
    oneDriveConfigs: OneDriveConfigs
    keys: string[]
    setCanUpload: (value: ((prevState: boolean) => boolean) | boolean) => void
} = (
    props: Props = {
        isDocument: false,
        setFiles: () => {},
        multiple: false,
    }
) => {
    const { isDocument, setFiles, multiple } = props
    const [keys, setKeys] = useState<string[]>([])
    const [canUpload, setCanUpload] = useState(false)

    /**
     * Throw an error if any of the required environment variables are missing
     */
    useEffect(() => {
        const requiredEnvVars = {
            SPACE_SECRET: !!space_secret,
            SPACE_KEY: !!space_key,
            SPACE_ENDPOINT: !!space_endpoint,
            SPACE_REGION: !!space_region,
            SPACE_DOCUMENTS: !!document_space,
            SPACE_IMAGES: !!image_space,
            ONEDRIVE_CLIENT_ID: !!onedrive_client_id,
            GOOGLE_CLIENT_PICKER_ID: !!google_client_id,
            GOOGLE_APP_ID: !!google_app_id,
            GOOGLE_API_KEY: !!google_api_key,
        }

        const missingEnvVars = Object.entries(requiredEnvVars)
            .filter(([_, value]) => !value)
            .map(([key, _]) => key)

        if (missingEnvVars.length > 0) {
            throw new Error(
                `Missing environment variables: ${missingEnvVars.join(', ')}`
            )
        }
    }, [])

    const s3Configs: S3Configs = {
        region: space_region,
        endpoint: space_endpoint,
        credentials: {
            accessKeyId: space_key,
            secretAccessKey: space_secret,
        },
    }

    const baseConfigs: BaseConfigs = {
        canUpload: canUpload,
        setKeys,
        onChange: (files: File[]) => (setFiles ? setFiles(files) : () => {}),
        multiple: multiple,
    }

    const cloudStorageConfigs: CloudStorageConfigs = {
        bucket: isDocument ? document_space : image_space,
        s3Configs,
    }

    const googleConfigs: GoogleConfigs = {
        google_api_key,
        google_app_id,
        google_client_id,
    }

    const oneDriveConfigs: OneDriveConfigs = {
        onedrive_client_id,
        multiSelect: false,
    }

    return {
        baseConfigs,
        cloudStorageConfigs,
        googleConfigs,
        oneDriveConfigs,
        setCanUpload,
        keys,
    }
}

export default useUpup