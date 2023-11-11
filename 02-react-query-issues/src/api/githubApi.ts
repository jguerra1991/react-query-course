import axios from 'axios';

export const gitHubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})
