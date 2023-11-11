import { useQuery } from "@tanstack/react-query"
import { Issue } from "../interfaces";
import { gitHubApi } from "../../api/githubApi";
import { sleep } from "../helpers/sleep";

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
    await sleep(2);
    const { data } = await gitHubApi.get<Issue>(`/issues/${ issueNumber }`)
    return data;
}

export const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
    await sleep(2);
    const { data } = await gitHubApi.get<Issue[]>(`/issues/${ issueNumber }/comments`)
    return data;
}



export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery({
        queryKey: ['issue', issueNumber],
        queryFn: () => getIssueInfo(issueNumber),
    });

    const commentsQuery = useQuery({
        queryKey: ['issue', issueNumber, 'comments'],
        queryFn: () => getIssueComments(issueQuery.data!.number),
        enabled: issueQuery.data !== undefined,
    });

    return {
        issueQuery,
        commentsQuery,
    }
}
