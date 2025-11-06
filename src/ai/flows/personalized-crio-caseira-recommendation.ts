'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized CrioCaseira product recommendations based on user quiz responses.
 *
 * - personalizedCrioCaseiraRecommendation - A function that takes user quiz responses and returns a personalized CrioCaseira product recommendation.
 * - RecommendationInput - The input type for the personalizedCrioCaseiraRecommendation function.
 * - RecommendationOutput - The return type for the personalizedCrioCaseiraRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendationInputSchema = z.object({
  weightLossGoal: z
    .string()
    .describe('The user\'s weight loss goal (e.g., "Up to 5 kg", "6 to 10 kg").'),
  ageRange: z
    .string()
    .describe('The user\'s age range (e.g., "18 to 29 years", "30 to 39 years").'),
  bodyDescription: z
    .string()
    .describe('How the user describes their body (e.g., "Defined", "Magro(a)").'),
  targetArea: z
    .string()
    .describe('The area of the body the user wants to reduce fat in (e.g., "Barriga / Abdômen", "Culotes / Flancos").'),
  mainImpediment: z
    .string()
    .describe('What prevents the user from eliminating fat (e.g., "Falta de tempo", "Falta de foco").'),
  desiredBenefit: z
    .string()
    .describe('The main benefit the user wants to experience (e.g., "Reduzir gordura localizada", "Dormir melhor").'),
  currentWeight: z.number().describe('The user\'s current weight in kilograms.'),
  height: z.number().describe('The user\'s height in centimeters.'),
  desiredWeight: z.number().describe('The user\'s desired weight in kilograms.'),
  dailyRoutine: z
    .string()
    .describe('The description of user current daily routine (e.g., "Minha rotina é corrida, mal tenho tempo pra mim", "Fico em casa, mas cuido de tudo e vivo cansada").'),
  sleepHours: z
    .string()
    .describe('Number of sleep hours the user has per night (e.g., "Menos de 5 horas", "Entre 5 e 7 horas").'),
  waterIntake: z
    .string()
    .describe('Number of water glass the user drinks per day (e.g., "Bebo só café ou chá", "1 a 2 copos por dia").'),
  dreamBody: z
    .string()
    .describe('The type of body the user wants to achieve (e.g., "Em Forma", "Com Curvas").'),
});
export type RecommendationInput = z.infer<typeof RecommendationInputSchema>;

const RecommendationOutputSchema = z.object({
  recommendation: z.string().describe('The personalized CrioCaseira product recommendation.'),
});
export type RecommendationOutput = z.infer<typeof RecommendationOutputSchema>;

export async function personalizedCrioCaseiraRecommendation(
  input: RecommendationInput
): Promise<RecommendationOutput> {
  return recommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'crioCaseiraRecommendationPrompt',
  input: {schema: RecommendationInputSchema},
  output: {schema: RecommendationOutputSchema},
  prompt: `Based on the user's quiz responses, provide a personalized CrioCaseira product recommendation. Consider their weight loss goal, age range, body description, target area, main impediment, desired benefit, current weight, height, desired weight, daily routine, sleep hours, water intake and dream body.

Weight Loss Goal: {{{weightLossGoal}}}
Age Range: {{{ageRange}}}
Body Description: {{{bodyDescription}}}
Target Area: {{{targetArea}}}
Main Impediment: {{{mainImpediment}}}
Desired Benefit: {{{desiredBenefit}}}
Current Weight: {{{currentWeight}}}
Height: {{{height}}}
Desired Weight: {{{desiredWeight}}}
Daily Routine: {{{dailyRoutine}}}
SleepHours: {{{sleepHours}}}
Water Intake: {{{waterIntake}}}
Dream Body: {{{dreamBody}}}

Recommendation:`,
});

const recommendationFlow = ai.defineFlow(
  {
    name: 'recommendationFlow',
    inputSchema: RecommendationInputSchema,
    outputSchema: RecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
