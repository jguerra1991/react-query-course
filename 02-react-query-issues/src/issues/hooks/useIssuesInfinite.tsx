import { useInfiniteQuery } from "@tanstack/react-query"
import { Issue, State } from "../interfaces";
import { sleep } from "../helpers";
import { gitHubApi } from "../../api/githubApi";

interface Props {
  state? : State;
  labels: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: ( string | Props)[];
}

const getIssues = async ( { pageParam = 1, queryKey } : QueryProps ):Promise<Issue[]> => {

  const [, , args] = queryKey;
  const { labels, state } = args as Props;

  const params = new URLSearchParams();

  if ( state ) params.append('state', state);

  if (labels.length > 0){
      const labelString = labels.join(',');
      params.append('labels', labelString);
  }

  params.append('page', pageParam.toString())
  params.append('per_page', '5')

  const { data } = await gitHubApi.get<Issue[]>('/issues', { params });
  return data;
}


export const useIssuesInfinite = ({ state, labels }: Props) => {

  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', {state, labels }],
    queryFn: (data) => getIssues(data),
    getNextPageParam: (lastPage, pages) => {
        if ( lastPage.length === 0 ) return;
        return pages.length + 1;
    },
    initialPageParam: 1 // Add this line to fix the error
  });


  return {
    issuesQuery
  }
}
