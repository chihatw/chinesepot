type Deployment = { uid: string; created: number };

export async function fetchLatestDeploymentTime() {
  const accessToken = process.env.VERCEL_ACCESS_TOKEN;

  const response_deployments = await fetch(
    `https://api.vercel.com/v6/deployments`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const { deployments }: { deployments: Deployment[] } =
    await response_deployments.json();

  const latestDeployment = deployments
    .sort((a, b) => b.created - a.created)
    .at(0)!;

  const response_deployment = await fetch(
    `https://api.vercel.com/v13/deployments/${latestDeployment.uid}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const { ready }: { ready: number } = await response_deployment.json();
  return ready;
}
