AUTHOR="Dmitri McGuckin"
DESCRIPTION="A public access web server for OreSat Live Scheduler via ULTRA."
CONTAINER=paws-nginx
LOCAL_IMAGE=paws
REMOTE_IMAGE=psaspdx/$(LOCAL_IMAGE):latest

IMAGE=$(REMOTE_IMAGE)
USE_LOCAL_BUILD=1
START_INTERACTIVE_MODE=1

build:
ifneq ($(wildcard ./dist/.*),)
	$(info "Found website build, skipping!")
else
	$(info "Did not find website build, building now...")
	ng build --prod
endif

	docker build \
		--compress \
		--network=host \
		--force-rm \
		--tag $(LOCAL_IMAGE) .

run:
ifeq ($(USE_LOCAL_BUILD), 1)
	$(info Prioritizing local build)
	$(eval IMAGE=$(LOCAL_IMAGE))
endif

ifeq ($(START_INTERACTIVE_MODE), 1)
	$(info Interactive mode enabled)
	$(eval FLAGS=--interactive)
endif

	docker run \
		--tty $(FLAGS) \
		--detach \
		--name $(CONTAINER) \
		--network=host \
		--ipc=host \
		--volume $(CERT_KEY):$(CERT_KEY) \
		--volume $(CERT_PEM):$(CERT_PEM) \
		$(IMAGE)

deploy:
	docker commit -a $(AUTHOR) -m $(DESCRIPTION) $(CONTAINER) $(REMOTE_IMAGE)
	docker push $(REMOTE_IMAGE)

kill:
	docker container kill $(CONTAINER)

clean:
	rm -rf dist
	docker container prune -f

start:
	docker start --attach --interactive $(CONTAINER)

attach:
	docker attach $(CONTAINER)
