"use server";

import { auth } from "@clerk/nextjs/dist/types/server";

export async function updateUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const user = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });
  if (!user) throw new Error("User Not Found")
    // if user is found
  try {

    const result = await db.$transaction(
        async (tx) => {
            // find if ind exists
            let industryInsight = await tx.industryInsight.findUnique({
                where:{
                    industry: data.industry
                }   
            })

            // if industry does not exist create it with default values

            if (!industryInsight){
                industryInsight = await tx.industryInsight.create(
                   {
                    data: {
                        industry: data.industry,
                        salaryRanges: [],
                        growthRate: 0,
                        demandLevel: "Medium",
                        topSkills: [],
                        marketOutlook: "Neutral",
                        keyTrends: [],
                        recommendedSkills: [],
                        nextUpdate: new Date(Date.now() + 7 * 24 * 60* 60* 1000)
                    }
                   }
                )
            }
            const updatedUser = await tx.user.update({
                where:{
                    id: user.id
                },
                data:{
                    industry: data.industry,
                    experience: data.experience,
                    bio: data.bio,
                    skills: data.skills
                }
            });
            return { updatedUser, industryInsight}
        }, {
            timeout: 10000,
        }
    ) // transaction make sures that all three steps complete
    // find if the industry exists
    // if industry does not exists, create if with default values. (Will replace it with AI later)
    // update the user
    return result.user
  } catch (error) {
    console.error("Error uploading user and industry:". error.message)
    throw new Error("failed to update profile")
  }
}
