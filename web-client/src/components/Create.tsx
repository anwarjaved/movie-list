import * as React from 'react';
import { DragEvent, useState } from 'react';
import { MdOutlineFileDownload } from "react-icons/md";
import { Formik, Form, Field, FieldProps } from 'formik';
import { useDropzone } from 'react-dropzone';
import { usePost } from '../apiService';
import * as reactRouterDom from 'react-router-dom';
import { Movie } from '../environments/model';

interface MyFormValues {
	title: string;
	publishingYear: string;
  file: string;
	poster: any;
}

const Create: React.FC = () => {
  let navigate = reactRouterDom.useNavigate();

	const initialValues: MyFormValues = { title: '', publishingYear: '', poster: '',file:'' };
	const [state, setState] = React.useState<MyFormValues>(initialValues);
  const [image,setImage]=React.useState<any>();
  const [errors,setErrors] =React.useState<string>('');
  const { execute: saveMovie,error } =  usePost<FormData>({
    url: `movie`,
    onComplete: () => {
      navigate('/movie');
    },
    onError: function (errorResponse): void {
      console.error('An error occurred:', errorResponse);
      setErrors(errorResponse?.data);
    }
  });

	const onDrop = React.useCallback((files: File[]) => {
		// Do something with the files
		const file = files[0];
    setImage(file);
		const reader = new FileReader();

		reader.onload = () => {
			// Do whatever you want with the file contents
			const binaryStr = reader.result;
			const newState = {
				...state, ...{
					file: binaryStr as string
				}
			}
			setState(newState);
		}
		reader.readAsDataURL(file);
	}, [])
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: onDrop,
		accept: {
			'image/png': ['.png', '.gif', '.jpg']
		},
	});
  const validate = (values: MyFormValues) => {
    const errors: Partial<MyFormValues> = {};
      if(image==null && image ==undefined)
      {
          errors.file ="Please select a poster!";
      }
      if(values.publishingYear.toString().length!=4){
         errors.publishingYear="Please enter a valid year in YYYY format";
      }
      return errors;
  }

	return (
		<section className='create'>

			<div className="container">
				<h1>Create a new movie</h1>
        {errors && <p style={{color:'red'}}>An error occurred: {errors}</p>}
				<div className="row">
					<div className="col-4 images">
						{state.file && <img src={state.file} />}
						{!state.file && <div
							{...getRootProps({ className: 'dropzone' })}
							className='drag'
						>
							<input {...getInputProps()} />
							<MdOutlineFileDownload size={30} />
							Drag an image here
						</div>}
					</div>
					<div className="col-8">
						<Formik
							initialValues={initialValues}
							onSubmit={(values, actions) => {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("title", values.title);
                formData.append("publishingYear",values.publishingYear.toString());

                saveMovie(formData);
								actions.setSubmitting(false);
							}}
						  validate={validate}
						>
							<Form>
								<Field id="title" type="text" name="title" placeholder="Title" required/>
								<Field id="publishingYear" className="publishing" type="number" name="publishingYear" placeholder="Publishing year" required />
								<div className="btn_grp">
									<button className='cancel'onClick={()=>navigate('/movie')}>Cancel</button>
									<button className='button' type="submit">Submit</button>
								</div>
							</Form>

						</Formik>
					</div>
				</div>

			</div>
		</section>

	);
};

export default Create;
