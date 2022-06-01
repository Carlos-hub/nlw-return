import { MailAdapter } from '../adapters/mailAdapter';
import {FeedbacksRepository} from '../repositories/feedbacksRepository'
interface SubmitFeedbackUseCaseRequest{
    type: string;
    comment:string;
    screenshot?:string;
}
export class SubmitFeedbackUseCase{

    constructor(
        private feedbackRepository:FeedbacksRepository,
        private mailAdapter: MailAdapter){
    }
    async execute(request:SubmitFeedbackUseCaseRequest){
        const {type, comment, screenshot} = request;

        if(!type){
            throw new Error('Type is required');
        }
        if(!comment){
            throw new Error('Type is required');
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('invalid screenshot format.')
        }

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot,
        });

        await this.mailAdapter.sendMail({
            subject:'novo Feedback',
            body:[
                `<div style="font-family:sans-serif; font-size:16px; color:#111">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` :null,
                `</div>`
            ].join('\n')
        })
    }
}