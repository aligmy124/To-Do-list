import { TaskQueryForm } from "../Validators/query/taskQuerySchema";

declare global{
    namespace Express{
        interface Request{
            paresedQuery?:TaskQueryForm
        }
    }
}
export{}