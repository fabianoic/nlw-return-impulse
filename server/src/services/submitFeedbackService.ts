import { MailAdapter } from "../adpters/mailAdaptar";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    constructor(
        private feedbacksRespository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) { }

    async execute(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is required');
        }

        if (!comment) {
            throw new Error('Comment is required');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRespository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendEmail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;"`,
                `<p>Tipo do Feedback: ${type}</p>`,
                `<p>Comentário: ${comment}`,
                screenshot ? `<img src="${screenshot}" />` : '',
                `</div>`,
            ].join('\n')
        })
    }
}