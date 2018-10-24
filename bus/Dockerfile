FROM python:latest

RUN mkdir /code
ADD bus.py /code/
ADD requirements.txt /code/

RUN pip install -r /code/requirements.txt

ENTRYPOINT ["python", "/code/bus.py"]