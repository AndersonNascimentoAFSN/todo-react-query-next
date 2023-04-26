import { Input } from "../components/Input";
import { InputLabel } from "../components/InputLabel";

export default function OpenClose() {
  return (
    <div>
      <h2>Open-Close Principle</h2>

      <Input placeholder="Digite seu nome" leftIcon label="nome" id="name">
        <InputLabel id="name">
          Nome
        </InputLabel>
      </Input>
    </div>
  )
}
