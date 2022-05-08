import { SubmitFeedbackService } from "./submitFeedbackService";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendEmail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemplo comment',
            screenshot: 'data:image/png;base64sdfasdfasdfasdf',
        })).resolves.not.toThrow();


        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'exemplo comment',
            screenshot: 'data:image/png;base64sdfasdfasdfasdf',
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64sdfasdfasdfasdf',
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback without screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemplo comment',
            screenshot: 'teste.png',
        })).rejects.toThrow();
    })
});