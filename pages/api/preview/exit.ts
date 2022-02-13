import { NextApiHandler } from "next";

const exitPreview: NextApiHandler = (_, response) => {
    response.clearPreviewData()

    response.redirect('/')
    response.end()
}

export default exitPreview