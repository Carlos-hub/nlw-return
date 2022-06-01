import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";


const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy}
)
describe('Submit Feedback',() =>{
    it('should be able to submit a feedback', async ()=>{

         await expect(submitFeedback.execute({
            type:'Bug',
            comment:'Exemple comment',
            screenshot:'data:image/png;base64,q5r34523453',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it('should not be able to submit a feedback without type', async ()=>{
        const submitFeedback = new SubmitFeedbackUseCase(
            { create: async () =>{}},
            { sendMail: async () =>{}}
        )
         await expect(submitFeedback.execute({
            type:'',
            comment:'Exemple comment',
            screenshot:'data:image/png;base64,q5r34523453',
        })).rejects.toThrow();
    });
    it('should not be able to submit a feedback without comment', async ()=>{
        const submitFeedback = new SubmitFeedbackUseCase(
            { create: async () =>{}},
            { sendMail: async () =>{}}
        )
         await expect(submitFeedback.execute({
            type:'Bug',
            comment:'',
            screenshot:'data:image/png;base64,q5r34523453',
        })).rejects.toThrow();
    });
    it('should not be able to submit a feedback without comment', async ()=>{
        const submitFeedback = new SubmitFeedbackUseCase(
            { create: async () =>{}},
            { sendMail: async () =>{}}
        )
         await expect(submitFeedback.execute({
            type:'Bug',
            comment:'example comment',
            screenshot:'123',
        })).rejects.toThrow();
    });
});