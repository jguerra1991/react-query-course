import axios from 'axios';

export const gitHubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})
