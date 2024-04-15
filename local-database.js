import { randomUUID } from "node:crypto"


export class Database {
	#summarizations = new Map();

	create(summarization)
	{
	const summarizationId = randomUUID();
	this.#summarizations.set(summarizationId, summarization)
	}

  list(search)
  {
	return Array.from(this.#summarizations.entries())
	.map((summarizationArray) => {
		const id = summarizationArray[0]
		const data = summarizationArray[1]

		return {
			id,
			...data
		}
	})
	.filter((summarization) => {
		if(search){
			return summarization.title.includes(search)
		}
		return true;
	})
  }

  update(id_n, summarization)
  {
	const validation = Array.from(this.#summarizations.entries())
	const value = validation.find((value) => value[0] == id_n)
	// console.log("Valor antigo é : ", value)
	if(value == undefined)
	{
		return false
	}
	else
	{
		let new_obj = {}
		Object.entries(summarization).map((el) =>{
			// console.log("Element is: " , el)
			if (el[1] == undefined){
				// console.log("entrei, el[1] is ",el[1],  "val = ", value[1][el[0]])
				new_obj[el[0]] = value[1][el[0]]
			}
			else{
				new_obj[el[0]] = el[1]
			}
		})
		this.#summarizations.set(id_n, new_obj)
	}
  }

  delete(id)
  {
	this.#summarizations.delete(id);
  }
}
