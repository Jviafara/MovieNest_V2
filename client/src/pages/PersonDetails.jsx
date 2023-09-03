import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import tmdbConfigs from '../api/config/tmdbConfigs';
import personApi from '../api/modules/personApi';
import Container from '../components/common/Container';
import PersonMediaGrid from '../components/common/PersonMediaGrid';
import { setGlobalLoading } from '../redux/features/globalLoadinSlice';

const PersonDetails = () => {
    const { personId } = useParams();
    const [person, setPerson] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        const getPerson = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await personApi.getDetail({ personId });
            dispatch(setGlobalLoading(false));

            if (err) toast.error(err.message);
            if (response) setPerson(response);
        };
        getPerson();
    }, [personId, dispatch]);

    return (
        <div>
            <div className="max-w-[1366px] mx-auto min-h-screen p-12 my-10">
                {person && (
                    <div>
                        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 mb-10">
                            <div className="w-[50%] md:w-[20%]">
                                <div
                                    style={{
                                        backgroundImage: `url(${tmdbConfigs.posterPath(
                                            person.profile_path
                                        )})`,
                                    }}
                                    className="pt-[160%] bg-cover bg-top bg-base-300"
                                />
                            </div>
                            <div className="w-full md:w-[80%] py-4 px-0  md:px-[2rem] p-4">
                                <div className="text-primary flex flex-col gap-4">
                                    <h1 className="text-xl font-semibold underline">
                                        {`${person.name} (${
                                            person.birthday.split('-')[0]
                                        }`}
                                        {person.deathday &&
                                            ` - ${
                                                person.deathday.split('-')[0]
                                            }`}
                                        {')'}
                                    </h1>
                                    <p className="line-clamp-[10] text-justify">
                                        {person.biography}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Container header="media">
                            <PersonMediaGrid personId={personId} />
                        </Container>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonDetails;
