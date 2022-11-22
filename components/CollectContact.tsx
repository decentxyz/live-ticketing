import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAccount } from "wagmi";
import formatAddress from "../lib/formatAddress";
import createContact from "../lib/airtable/createContact";
import checkUnique from "../lib/airtable/checkUnique";
import { check } from "yargs";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const schema = yup.object().shape({
  email: yup.string().email()
    .required('Must enter your email address to receive an event ticket.'),
  phoneNumber: yup.string().matches(phoneRegExp, 'Please enter a valid phone number.')
});

type FormData = {
  email: string;
  phoneNumber: string;
};

const CollectContact = () => {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, getValues, formState: { errors } } = methods;
  const onSubmit = handleSubmit(data => console.log(data));
  const { address } = useAccount();
  
  const [wallet, setWallet] = useState('');
  const [matchCount, setMatchCount] = useState();
  useEffect(() => {
    address && 
    setWallet(address);
  }, [address]);

  const addContact = async () => {
    let result = await checkUnique(wallet);
    console.log(result)
  }

  return (
    <FormProvider {...methods}>
    <form onSubmit={onSubmit} className='gap- bg-white bg-opacity-10 rounded-lg p-4'>
      <div className="space-y-4">
        <div>
          <p className="pl-2 pb-2">Wallet Address</p>
          <input className="contact-info tracking-widest" placeholder={formatAddress(wallet)} disabled />
        </div>

        <div>
          <p className="pl-2 pb-2">Email</p>
          <input className="contact-info tracking-widest" placeholder="vitalik@ethereum.org" {...register("email", {required: "Must enter an email to claim this ticket."} )} />
          <p className="text-red-600 text-sm pt-1 w-52 flex flex-wrap"><ErrorMessage errors={errors} name="email" /></p>
        </div>

        <div>
          <p className="pl-2 pb-2">Phone Number</p>
          <input className="contact-info tracking-widest" placeholder="1-347-899-5900" {...register("phoneNumber")} />
          <p className="text-red-600 text-sm pt-1 w-52 flex flex-wrap"><ErrorMessage errors={errors} name="phoneNumber" /></p>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="w-fit" type="button" onClick={() => addContact()}>
          <input type="submit" className="mt-4 cursor-pointer bg-white text-indigo-500 px-4 py-1 rounded-full"/>
        </button>
      </div>
    </form>
    </FormProvider>
  )
}

export default CollectContact;